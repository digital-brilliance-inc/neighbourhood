import './map-panel-logged-out.scss';

export const MapPanelLoggedOut = () => {
  return (
    <div className="map-panel-logged-out">
      <h4 className="bold">Let&apos;s Love Our Neighbourhoods Together</h4>
      <div className="step-container">
        <div className="step-number purple">1</div>
        <div className="step-contents">
          <p>
            Are you a follower of Jesus? <a className="purple">Sign up for the newsletter</a> to be in the loop with
            what God is doing in our city and opportunities to connect.
          </p>
        </div>
      </div>
      <div className="step-container">
        <div className="step-number blue">2</div>
        <div className="step-contents">
          <p>
            Find a Neighbourhood Advocate near you and <a className="blue">create a free account</a> in order to send a
            message and get connected.
          </p>
        </div>
      </div>
      <div className="step-container">
        <div className="step-number pink">3</div>
        <div className="step-contents">
          <p>
            Nothing in your neighbourhood? <a className="pink">Become a Neighbourhood Advocate</a> to help the Kingdom
            grow in your near you.
          </p>
        </div>
      </div>
    </div>
  );
};
