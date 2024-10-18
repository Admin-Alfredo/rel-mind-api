import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'



export const getBcryptHash = (str: string): string => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(str, salt)
}
export const compareBcryptHash = (inputStr: string, hash: string): boolean =>
    bcrypt.compareSync(inputStr, hash);

export const jwtSign = (payload: Object | string): string => {
    return jwt.sign(payload, process.env.SECRET_KEY!, {})
}
export const jwtVerify = (token: string): string | jwt.JwtPayload => {
    return jwt.verify(token, process.env.SECRET_KEY!)
}