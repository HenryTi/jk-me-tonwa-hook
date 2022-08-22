import { EnumRole, Enumshop } from "uqs/BzUShop";

export const en: { [key in (EnumRole | Enumshop)]: string } = {
    [EnumRole.shopmanager]: 'Shop manager',
    [Enumshop.product]: 'Product manager',
    [Enumshop.delivery]: 'Delivery manager',
    [Enumshop.accountant]: 'Accountant',
}
