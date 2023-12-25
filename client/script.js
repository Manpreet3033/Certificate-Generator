const generatePDF = async (name,certification,email,start,end) => {
    const { PDFDocument,rgb } = PDFLib; 
    const bytes = await fetch("./certificate-template.pdf").then((res) => {
        return res.arrayBuffer();
   });
   const font = await fetch("./Virtual-Regular.ttf").then(res => {
        return res.arrayBuffer();
   })
   const pdfDoc = await PDFDocument.load(bytes); 
   pdfDoc.registerFontkit(fontkit);
   const myFont = await pdfDoc.embedFont(font);
   const pages = pdfDoc.getPages();
   const firstPage = pages[0];
   firstPage.drawText(name,{
        x: 345,
        y:300,
        size: 90,
        font: myFont,
        color: rgb(1,1,1)
   })
   firstPage.drawText(start,{
        x: 460,
        y:215,
        size: 15,
        color: rgb(0.20,0.62,0.92)
   })
   firstPage.drawText(certification,{
    x: 620,
    y: 237,
    size: 15,
    color: rgb(0.20,0.62,0.92)
})
   firstPage.drawText(end,{
    x: 580,
    y:215,
    size: 15,
    color: rgb(0.20,0.62,0.92)
})
   const uri = await pdfDoc.saveAsBase64({dataUri: true});
   return uri;
};
     const submitBtn = document.getElementById('submit-btn');
     submitBtn.addEventListener('click', async () => {
         const uname = document.getElementById('user-name').value;
         const certification = document.getElementById('certification').value;
         const startDate = document.getElementById('start-date').value;
         const endDate = document.getElementById('end-date').value;
         const email = document.getElementById('email').value;
 
         const pdfDataUri = await generatePDF(uname, certification, email, startDate, endDate);
 
         sendEmail(uname, certification, email, startDate, endDate, pdfDataUri);
     });

 
 const sendEmail = async (name, certification, email, start, end, pdfDataUri) => {
     const response = await fetch('http://localhost:3000/send-email', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              name,
              certification,
              email,
              start,
              end,
              pdfData: pdfDataUri.split(',')[1],
          }),
      });
     if (response.ok) {
         alert('Email sent successfully!');
     } else {
         alert('Failed to send email. Please try again.');
     }
 };
 
