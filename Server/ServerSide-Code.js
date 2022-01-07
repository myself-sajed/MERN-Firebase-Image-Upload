app.post('/upload', function (req, res) {

    const arrayDoc = req.body
    console.log(arrayDoc);

    const aadhar = arrayDoc.find(element => element.filename === 'aadhar');
    const voter = arrayDoc.find(element => element.filename === 'voter');
    const selfDeclaration = arrayDoc.find(element => element.filename === 'selfDeclaration');
    const itr = arrayDoc.find(element => element.filename === 'itr');
    const disability = arrayDoc.find(element => element.filename === 'disability');
    const ration = arrayDoc.find(element => element.filename === 'ration');
    const ref = arrayDoc.find(element => element.filename === 'vleDetails');

    const document = new Document({
        selfDeclaration: selfDeclaration.fileUrl,
        aadhar: aadhar.fileUrl,
        voter: voter.fileUrl,
        itr: itr.fileUrl,
        disability: disability.fileUrl,
        ration: ration.fileUrl,
        refApplication: ref.refApplication, refVle: ref.refVle
    })

    document.save()
    console.log('This is your saved documents url', document);



    res.send({ message: 'saved', documents: document });
})