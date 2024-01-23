import PropTypes from "prop-types";
import "./ReportTable.scss";

const formatedDate = (dateString) => {
  const [datePart, timePart] = dateString.split(" ");
  const [month, day, year] = datePart
    .split("-")
    .map((num) => parseInt(num, 10));
  const formattedDateString = `${month}/${day}/${year} ${timePart}`;

  const newDate = new Date(formattedDateString);
  const formattedDate = newDate.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return formattedDate;
};

const ReportTable = ({ data, columnHeaders, renderRowActions }) => {
  return (
    <div className="report-table">
      <table>
        <thead>
          <tr>
            {columnHeaders.map((header) => (
              <th key={header.key}>{header.label}</th>
            ))}
            {renderRowActions && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              {columnHeaders.map((header) => (
                <td key={header.key}>
                  {header.key === "orderDate"
                    ? formatedDate(item[header.key])
                    : item[header.key]}
                </td>
              ))}
              {renderRowActions && <td>{renderRowActions(item)}</td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

ReportTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  columnHeaders: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  renderRowActions: PropTypes.func,
};

export default ReportTable;
