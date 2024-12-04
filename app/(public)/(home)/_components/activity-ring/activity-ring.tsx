import clsx from 'clsx';
import './activity-ring.scss';

export const ActivityRing = ({ color = 'pink', value, label }: { color: string; value: number; label: string }) => {
  return (
    <div className="ring-container">
      <svg className="activity-ring-svg" viewBox="0 0 37 37">
        <g className={clsx('ring', { [color]: color })} style={{ transform: 'scale(1) rotate(-90deg)' }}>
          <circle strokeWidth="4" r="14.915" cx="50%" cy="50%" className="background" />
          <circle
            strokeWidth="4"
            r="14.915"
            cx="50%"
            cy="50%"
            className="completed"
            strokeDasharray={`${value * 100}, 100`}
          />
        </g>
      </svg>
      <div className="ring-label-container">
        <div className="ring-value">{(value * 100).toFixed(1)}%</div>
        <div className="ring-label">{label}</div>
      </div>
    </div>
  );
};
