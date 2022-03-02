export interface User {
    _id : String;
    pseudo : String;
    email : string;
    password : String;
    tel : String;
    ville : String;
    age : Number;
    rule : string;
}

export type UserLoginDto = Pick<User, 'email' | 'password'>
/*
// type with all properties from BookDto, excluding id
export type BookCreateDto = Omit<BookDto,'id'>;
// type with only id property from BookDto + all properties as optional from BookDto
export type BookUpdateDto = Pick<BookDto, 'id'> & Partial<BookDto>;
export type BookResetDto = BookUpdateDto;
*/