import './about-level.scss';

export const AboutLevel = ({ num, color }: { num: Number; color: String }) => {
  return (
    <div className={`level-block ${color}`}>
      <div className="level-label">LEVEL</div>
      <div className="level-num">{num.toString()}</div>
    </div>
  );
};
