import { Link } from 'react-router-dom';

const Weight = ({
  bw_start,
  bw_current,
  bw_goal,
  title,
  showTitle = true
}) => {

  return (
    <div>
      {showTitle && <h3>{title}</h3>}
      <div className="card mb-3">
        <div class="ui horizontal list">
          <div class="item">
              <div class="content">
              <div class="header">Start</div>
              {bw_start}
              </div>
          </div>
          <div class="item">
              <div class="content">
              <div class="header">Current</div>
              {bw_current}
              </div>
          </div>
          <div class="item">
              <div class="content">
              <div class="header">Goal</div>
              {bw_goal}
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weight;
