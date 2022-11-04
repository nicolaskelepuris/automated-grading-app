import html2canvas from "html2canvas";

const generateImage = (element_id) => {
  html2canvas(document.getElementById(element_id))
    .then(canvas => {
      const data = canvas.toDataURL('image/jpg');
      const link = document.createElement('a');

      if (typeof link.download === 'string') {
        link.href = data;
        link.download = 'image.jpg';

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        window.open(data);
      }
    });
}

export default generateImage;
