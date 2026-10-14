export class CreateProductDto {
    name! : string;
    price! : number;
    stock !: number;
    description! : string;
    image! : string;
}
//DTO = Data Transfer Objectเอาไว้กำหนดว่า ข้อมูลที่ Client ส่งเข้ามาต้องมีหน้าตาแบบไหน
// ข้อมูลนี้ไม่จำเป็นต้องส่งมาก็ได้