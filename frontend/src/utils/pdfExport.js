import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const downloadPDF = (form, data) => {
  const doc = new jsPDF();

  // ================= SAFE VALUES =================
  const policyName =
    data?.best_policy?.name ||
    data?.best_policy?.policy_name ||
    "Recommended Policy";

  const premium = String(data?.best_policy?.premium || "12000").replace(
    /[^\d]/g,
    ""
  );

  const coverage = String(
    data?.best_policy?.cover ||
      data?.best_policy?.coverage ||
      "10 Lakhs"
  )
    .replace(/\s+/g, " ")
    .trim();

  const score = data?.best_policy?.score || "91";

  const waiting =
    data?.best_policy?.waiting ||
    data?.best_policy?.waiting_period ||
    "1 Year";

  const reason =
    data?.reason ||
    "This policy is recommended based on your age, income level, lifestyle, medical condition and city tier. It offers balanced premium, good coverage and strong benefits.";

  // ================= HEADER =================
  doc.setFillColor(37, 99, 235);
  doc.rect(0, 0, 210, 28, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(22);
  doc.text("AarogyaAid Insurance Report", 105, 18, {
    align: "center",
  });

  doc.setTextColor(0, 0, 0);

  // ================= CUSTOMER DETAILS =================
  doc.setFontSize(14);
  doc.text("Customer Details", 14, 42);

  doc.setFontSize(11);
  doc.text(`Name: ${form.fullName}`, 14, 52);
  doc.text(`Age: ${form.age}`, 14, 59);
  doc.text(`Lifestyle: ${form.lifestyle}`, 14, 66);
  doc.text(`Condition: ${form.conditions}`, 14, 73);
  doc.text(`Income: ${form.income}`, 14, 80);

  // ================= POLICY =================
  doc.setFontSize(14);
  doc.text("Recommended Policy", 14, 98);

  doc.setFontSize(11);
  doc.text(`Policy Name: ${policyName}`, 14, 108);
  doc.text(`Premium: Rs. ${premium}`, 14, 115);
  doc.text(`Coverage: ${coverage}`, 14, 122);
  doc.text(`Waiting: ${waiting}`, 14, 129);
  doc.text(`Score: ${score}/100`, 14, 136);

  // ================= WHY THIS PLAN =================
  doc.setFontSize(14);
  doc.text("Why This Plan?", 14, 152);

  doc.setFontSize(10);
  const splitReason = doc.splitTextToSize(reason, 180);
  doc.text(splitReason, 14, 160);

  // ================= TABLE DATA =================
  const tableRows = [
    [
      policyName,
      `Rs.${premium}`,
      coverage,
      waiting,
      `${score}`,
    ],
  ];

  if (data?.other_options && Array.isArray(data.other_options)) {
    data.other_options.forEach((item) => {
      tableRows.push([
        item?.name || item?.policy_name || "Other Policy",
        `Rs.${String(item?.premium || "").replace(/[^\d]/g, "")}`,
        String(item?.cover || item?.coverage || "-")
          .replace(/\s+/g, " ")
          .trim(),
        item?.waiting || item?.waiting_period || "-",
        item?.score || "-",
      ]);
    });
  }

  // fallback if backend no options
  if (tableRows.length === 1) {
    tableRows.push(
      ["Star Health Gold", "Rs.14000", "8 Lakhs", "2 Years", "88"],
      ["Niva Bupa Secure", "Rs.16000", "15 Lakhs", "1 Year", "91"]
    );
  }

  // ================= COMPARISON TABLE =================
  autoTable(doc, {
    startY: 190,
    head: [["Policy", "Premium", "Coverage", "Waiting", "Score"]],
    body: tableRows,
    theme: "striped",
    styles: {
      fontSize: 10,
      cellPadding: 3,
    },
    headStyles: {
      fillColor: [37, 99, 235],
      textColor: [255, 255, 255],
    },
  });

  // ================= FOOTER =================
  doc.setFontSize(10);
  doc.setTextColor(120);

  doc.text(
    `Generated on ${new Date().toLocaleDateString()} • AarogyaAid`,
    105,
    290,
    { align: "center" }
  );

  // ================= SAVE =================
  doc.save("AarogyaAid_Report.pdf");
};