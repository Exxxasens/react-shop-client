declare global {
    interface LoginSchema {
        email: string;
        password: string;
    }

    interface RegisterSchema {
        email: string;
        name: string;
        lastname: string;
        password: string;
    }

    interface UpdatePasswordSchema {
        password: string;
        newPassword: string;
        repeatPassword: string;
    }

    interface IUser {
        _id: string;
        role: string;
        email: string;
        name: string;
        lastname: string;
    }

    interface IAddress {
        _id: string;
        region: string;
        city: string;
        street: string;
        building: string;
        postCode: string;
    }

    interface IProperty {
        _id: string;
        name: string;
        value: string;
    }

    interface IProduct {
        _id: string;
        name: string;
        description: string;
        shortDescription?: string;
        buyPrice: number;
        sellPrice: number;
        vendorCode: string;
        quantity: number;
        show: boolean;
        properties: IProperty[];
        categories: ICategory[];
        variants: string[];
        images: string[];
    }

    interface ICategory {
        _id: string;
        parent?: string | null;
        title: string;
        // link: string;
    }

    interface ICategoryTreeItem extends ICategory {
        children: ICategoryTreeItem[];
    }

    interface IMessage {
        type: 'error' | 'info' | 'success';
        text: string;
    }

    interface IMenuItem {
        title?: string;
        icon?: React.ReactNode;
        className?: string;
        handler?: () => void;
    }

    interface ErrorResponse {
        status: number;
        message: string;
    }

    interface IUpdateProduct
        extends Omit<IProduct, 'properties' | 'variants' | 'categories' | 'images'> {
        properties: string[];
        variants: string[];
        categories: string[];
    }

    interface IUploadImageResponse {
        fieldname: string;
        originalname: string;
        encoding: string;
        mimetype: string;
        id: string;
        filename: string;
        chinkSize: number;
        size: number;
        uploadDate: string;
        contentType: string;
    }

    interface ICreateOrder {
        user?: string | null;
        fullName: string;
        products: {
            count: number;
            product: string;
        }[];
        phone: string;
        comment: string;
    }

    interface IOrder {
        _id: string;
        user?: string | null;
        fullName: string;
        products: {
            count: number;
            product: {
                name: string;
                images: string[];
                sellPrice: number;
                buyPrice: number;
                vendorCode: string;
                reference: string;
            };
        }[];
        phone: string;
        comment: string;
        status: string;
        createdAt: string;
        updatedAt: string;
    }
}

export {};
