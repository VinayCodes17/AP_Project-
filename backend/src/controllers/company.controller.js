import Company from '../models/company.model.js';

// GET /api/companies
// Optional query params: type, sector, year, search
export const getAllCompanies = async (req, res) => {
  try {
    const { type, sector, year, search } = req.query;

    const filter = {};

    if (type && type !== 'all')    filter.type   = type;
    if (sector && sector !== 'all') filter.sector = sector;
    if (year && year !== 'all')    filter.year   = year;
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { role: { $regex: search, $options: 'i' } },
      ];
    }

    const companies = await Company.find(filter).sort({ name: 1 });
    res.status(200).json({ success: true, count: companies.length, data: companies });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/companies/:id
export const getCompanyById = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    if (!company) return res.status(404).json({ success: false, message: 'Company not found' });
    res.status(200).json({ success: true, data: company });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
