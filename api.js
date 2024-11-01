const express = require("express")
const app = express()

PORT = 23

app.use(express.json())
app.listen(PORT, () => {
    console.log(`Listening on PORT: ${PORT}`)
})
app.get("/api/gp-co-cipher", (req, res) => {
    const { txt, key, tsk } = req.query
    try {1
        if(tsk == "en" || tsk == "encrypt" || tsk == 1){
            res.json(Logic(txt, key, true))
            return
        }
        if(tsk == "de" || tsk == "decrypt" || tsk == 0){
            res.json(Logic(txt, key, false))
            return
        }
        else{
            res.json({
                error: `Unable to parse '${tsk}' command!`,
                hint: "Use 'en' to encrypt and 'de' to decrypt."
              });
              
        }

    } catch (error) {
        console.log("error:",error)
    }
})



const Logic = (str, key, encrypt = true) => {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const shiftedAlphabet = alphabet.slice(key.length) + alphabet.slice(0, key.length);
    const cipher = encrypt ? shiftedAlphabet : alphabet;
    const decipher = encrypt ? alphabet : shiftedAlphabet;

    return str.split('').map(char => {
        const index = cipher.indexOf(char);
        return index !== -1 ? decipher[index] : char;
    }).join('');
}
