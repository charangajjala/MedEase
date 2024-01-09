import ReactDOM from "react-dom/client";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { Invoice } from "../components";

const PdfGen = async (activeOrderData, fileName) => {
  console.log("PdfGen: Starting PDF generation process");
  console.log(activeOrderData, fileName);

  // Create a container for the invoice
  const container = document.createElement("div");
  container.style.height = "0";
  container.style.overflow = "hidden";
  document.body.appendChild(container);

  console.log("PdfGen: Container for invoice created");

  // Use the new createRoot API to render the Invoice component
  const root = ReactDOM.createRoot(container);
  console.log("PdfGen: Rendering Invoice component");
  root.render(<Invoice activeOrderData={activeOrderData} />);

  try {
    console.log("PdfGen: Converting rendered invoice to canvas");
    const canvas = await html2canvas(container, { scale: 2 });
    console.log("PdfGen: Canvas conversion complete");

    const imgData = canvas.toDataURL("image/png");
    console.log(`PdfGen: Image data is ${imgData}`);
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    console.log("PdfGen: Adding image to PDF");
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    console.log("PdfGen: Saving PDF");
    pdf.save(fileName);

    // Clean up: unmount and remove the container
    console.log("PdfGen: Cleaning up");
    root.unmount();
    container.remove();
    console.log("PdfGen: PDF generation process complete");
  } catch (error) {
    console.error("PdfGen: Error generating PDF", error);
  }
};

export default PdfGen;
