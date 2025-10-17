
import bcrypt from 'bcryptjs' 
import User from '../models/User.model'

 export const createDefaultAdmin=async()=>{
try {
    const checkAdminCreated=await User.findOne({ role: "admin" })

    if(!checkAdminCreated){
        const setDefualtpassword="admin123"
        const hashedPassword =await bcrypt.hash(setDefualtpassword,10)
        await User.create({
            name:'admin',
            email:'123@admin.com',
            role:"admin",
            password:hashedPassword ,
        })
        console.log('Admin created')
    }else{
        console.log('Admin already created')
    }

} catch (error) {
    console.error("Errors comes when default admin is created", error);
}
}