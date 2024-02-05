import { asyncHandler } from "../utils/asyncHandler.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.model.js"
import { uploadOnCloudinary } from "../utils/Cloudinary.js";


const registerUser = asyncHandler( async (req, res) => {
    // get user details from frontend
    // validation - not empty
    // check if user already exists: username, email
    // check for images, check for avatar
    // upload them to cloudinary, avatar
    // create user object - create entry in db
    // remove password and refresh token field from response
    // check for user creation
    // return res

    const { fullName, username, password, email } = req.body
    if( [ fullName, username, password, email ].some( (field) => field?.trim() === "") ){
        throw new ApiError(400, "All fields required")
    }

    const existUser = User.find({ $or: [ {email}, {username}] })
    if(existUser){
        throw new ApiError(409, "User with email and username already exits")
    }

    const avatarLocalPath = req.file?.avatar[0]?.path
    let coverImageLocalPath

    if(req.file && Array.isArray(req.file.coverImage) && req.file.coverImage.length > 0 ){
        coverImage = req.file.coverImage[0].path
    }

    if(!avatarLocalPath){
        throw new ApiError( 406,"Avatar is required." )
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if(!avatar){
        throw new ApiError(400, "Avtar is required")
    }

    const user = await new User.create({
        fullName,
        password,
        email,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        username: username.toLowerCase()
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createdUser){
        throw new ApiError(500, "Something went wrong while registeration")
    }

    res.status(201).json(
        new ApiResponse(201, createdUser, "User registered Successfully")
    )

})



export {
    registerUser,
}