import Contact from '../module/contacts.js';

export const getAllContacts = async (_, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json({
      status: 200,
      message: 'Successfully found contacts!',
      data: contacts,
    });
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({
      message: 'An error occurred while fetching contacts',
    });
  }
};

export const getContactById = async (req, res) => {
  const { id } = req.params;

  try {
    const contact = await Contact.findById(id);

    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.status(200).json({
      status: 200,
      message: `Successfully found contact with id ${id}!`,
      data: contact,
    });
  } catch (error) {
    console.error(`Error fetching contact with id ${id}:`, error);
    res.status(500).json({
      message: `An error occurred while fetching contact with id ${id}`,
    });
  }
};
