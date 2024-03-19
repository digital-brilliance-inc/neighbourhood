import clsx from 'clsx';
import './metric.scss';

export const Metric = ({ color = 'pink', value, label }: { color: string; value: number; label: string }) => {
  return (
    <div className="metric-container">
      <div className="metric-label-container">
        <div className="metric-value">{value}</div>
        <div className="metric-label">{label}</div>
      </div>
    </div>
  );
};
