import asyncHandler from '../middlewares/asyncHandler.js'

export const getPNRStatus = asyncHandler(async (req, res) => {
  const { pnr } = req.params
  // Fake lookup
  res.json({ pnr, status: 'Confirmed', trainNo: '12607', from: 'Bangalore', to: 'Chennai' })
})
