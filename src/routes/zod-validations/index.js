const zod = require("zod");


const signinBody = zod.object({
    username: zod.string().email(),
	password: zod.string()
})

const signupBody = zod.object({
    username: zod.string().email(),
	firstName: zod.string(),
	lastName: zod.string(),
	password: zod.string()
})

module.exports = {
    signinBody,
    signupBody
}