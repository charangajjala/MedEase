import PropTypes from 'prop-types';
import './ReportTable.scss';

const ReportTable = ({ data, columnHeaders, renderRowActions }) => {
  return (
    <div className="report-table">
      <table>
        <thead>
          <tr>
            {columnHeaders.map(header => (
              <th key={header.key}>{header.label}</th>
            ))}
            {renderRowActions && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr key={item.orderId}>
              {columnHeaders.map(header => (
                <td key={header.key}>{item[header.key]}</td>
              ))}
              {renderRowActions && (
                <td>
                  {renderRowActions(item)}
                </td>
              )}
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
