import express from 'express';
import type { Request, Response, NextFunction } from 'express';
import customerRoutes from './infrastructure/routes/customer.routes.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Routes
app.use('/api/customers', customerRoutes);

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction): void => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
    next(err);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});