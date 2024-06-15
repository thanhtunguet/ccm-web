### Hướng dẫn Import

| STT | Tên trường | Giải thích                                                                   | Ví dụ      |
|-----|------------|------------------------------------------------------------------------------|------------|
| 1   | id         | ID của giao dịch, dạng số nguyên                                             | 1          |
| 2   | customerId | ID của khách hàng, dạng số nguyên (Đối chiếu với danh sách khách hàng)       | 3          |
| 3   | cardId     | ID của thẻ thanh toán, dạng số nguyên (Đối chiếu với danh sách thẻ)          | 5          |
| 4   | code       | Mã giao dịch                                                                 | GD12345678 |
| 5   | amount     | Số tiền giao dịch, dạng số thực (VD: 1000.00)                                | 500.50     |
| 6   | fee        | Phí giao dịch, dạng số thực (VD: 10.00)                                      | 5.00       |
| 7   | statusId   | ID trạng thái giao dịch, dạng số nguyên (Đối chiếu với danh sách trạng thái) | 2          |

### Sao kê VPBank

Đối với sao kê VPBank:

- Hãy chắc chắn rằng, các dòng sao kê được format thành một dòng duy nhất trong từng ô (không có ký tự xuống dòng)
- Bạn có thể dùng hàm Excel để chuyển đổi chúng. Gợi ý:
	```vb
	=SUBSTITUTE(A2, CHAR(10), " ")
	```
- Copy cả cột chứa text sao kê (ngoại trừ header và các dòng trống), paste vào ô textarea trên phần mềm.
- Phần mềm sẽ đọc sao kê và tìm ra các giao dịch đã hoàn tiền
  