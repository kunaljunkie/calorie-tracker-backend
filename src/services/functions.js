exports.MenBmr =  (age,weight,height)=>{
    let bmr = 66.4730 + (13.7516 * weight) + (5.0033 * height) - (6.7550 * age)
    return bmr

}
exports.WomenBmr = async (age,weight,height)=>{
    let bmr = 655.0955 + (9.5634 * weight) + (1.8496 * height) - (4.6756 * age)
    return bmr
}

// exports= {
//     MenBmr,
//     WomenBmr
// }