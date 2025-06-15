import visitorModel from '../models/visitorModel.js';

const logVisitor = async (req, res, next) => {
  try {
    const ip =
      req.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
      req.connection?.remoteAddress ||
      req.socket?.remoteAddress ||
      'unknown';

    if (!ip) return next();

    await visitorModel.create({ ip });

    next();
  } catch (err) {
    console.error('Visitor logging error:', err);
    next();
  }
};

export default logVisitor;
