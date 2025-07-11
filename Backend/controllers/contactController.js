exports.sendMessage = (req, res) => {
    const { phoneNumber, socialMedia } = req.body;
  
    if (!phoneNumber || !socialMedia) {
      return res.status(400).json({ message: 'Please provide valid contact details.' });
    }
  
    // save to the database
    console.log('Contact message received:', { phoneNumber, socialMedia });
  
    return res.status(200).json({ message: 'Contact information received successfully.' });
  };
