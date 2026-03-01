const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Get all pending doctor verifications
router.get('/pending-doctors', async (req, res) => {
  try {
    const pendingDoctors = await User.find({
      role: 'doctor',
      verificationStatus: 'pending'
    }).select('-password');
    
    res.json(pendingDoctors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all doctors (with verification status)
router.get('/doctors', async (req, res) => {
  try {
    const doctors = await User.find({
      role: 'doctor'
    }).select('-password');
    
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Verify a doctor (admin only)
router.post('/verify-doctor/:doctorId', async (req, res) => {
  try {
    const { doctorId } = req.params;
    const { adminId, status } = req.body; // status: 'verified' or 'rejected'
    
    if (!['verified', 'rejected'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status. Must be "verified" or "rejected"' });
    }
    
    const doctor = await User.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ error: 'Doctor not found' });
    }
    
    if (doctor.role !== 'doctor') {
      return res.status(400).json({ error: 'User is not a doctor' });
    }
    
    doctor.verificationStatus = status;
    doctor.isVerified = status === 'verified';
    doctor.verifiedAt = status === 'verified' ? new Date() : null;
    doctor.verifiedBy = adminId;
    
    await doctor.save();
    
    res.json({
      message: `Doctor ${status} successfully`,
      doctor: {
        _id: doctor._id,
        name: doctor.name,
        email: doctor.email,
        nmcCode: doctor.nmcCode,
        qualification: doctor.qualification,
        stateMedicalCouncil: doctor.stateMedicalCouncil,
        isVerified: doctor.isVerified,
        verificationStatus: doctor.verificationStatus,
        verifiedAt: doctor.verifiedAt
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Check NMC registration (mock - in production, integrate with NMC API)
router.post('/check-nmc', async (req, res) => {
  try {
    const { nmcCode, name } = req.body;
    
    // Mock verification - in production, call actual NMC API
    // For demo purposes, we'll accept any NMC code that starts with 'NMC'
    const isValid = nmcCode && nmcCode.toUpperCase().startsWith('NMC');
    
    res.json({
      valid: isValid,
      message: isValid 
        ? 'NMC registration found' 
        : 'NMC registration not found',
      details: isValid ? {
        registrationNumber: nmcCode,
        name: name,
        status: 'Active',
        registrationDate: '2020-01-15',
        council: 'National Medical Commission'
      } : null
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Auto-verify doctor by checking NMC (admin can trigger this)
router.post('/auto-verify-doctor/:doctorId', async (req, res) => {
  try {
    const { doctorId } = req.params;
    const { adminId } = req.body;
    
    const doctor = await User.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ error: 'Doctor not found' });
    }
    
    if (doctor.role !== 'doctor') {
      return res.status(400).json({ error: 'User is not a doctor' });
    }
    
    // Check NMC registration
    const nmcCheck = await fetch('http://localhost:3000/api/verification/check-nmc', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nmcCode: doctor.nmcCode,
        name: doctor.name
      })
    }).then(r => r.json());
    
    if (nmcCheck.valid) {
      doctor.verificationStatus = 'verified';
      doctor.isVerified = true;
      doctor.verifiedAt = new Date();
      doctor.verifiedBy = adminId;
      await doctor.save();
      
      res.json({
        message: 'Doctor verified successfully via NMC check',
        doctor: {
          _id: doctor._id,
          name: doctor.name,
          email: doctor.email,
          nmcCode: doctor.nmcCode,
          isVerified: doctor.isVerified,
          verificationStatus: doctor.verificationStatus
        },
        nmcDetails: nmcCheck.details
      });
    } else {
      res.status(400).json({
        error: 'NMC verification failed',
        message: nmcCheck.message
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
