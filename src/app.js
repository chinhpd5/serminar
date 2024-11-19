// Import thư viện// module
import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config'

// Khởi tạo server
const app = express();
// Khởi tạo cổng 
const port = process.env.PORT || 3000;

// Kết nối CSDL MongoDB
mongoose.connect(process.env.CONNECTION_STRING_MONGODB)
    .then(() => console.log('DB Connected!'));

// Khai báo cho phép nhận Kiểu dữ liệu json khi Resquest
app.use(express.json());

// Cấu hình các Router
// Khai báo router product
import routerProduct from './router/product.router.js'
import routerUser from './router/user.router.js'

app.use('/api/product',routerProduct);
app.use('/api/auth',routerUser);


app.listen(port, () => {
  console.log(`Example app listening on port: http://localhost:${port}`)
})