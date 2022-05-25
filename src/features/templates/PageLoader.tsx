import LoadingImg from 'src/assets/unguess_loader.gif';

const PageLoader = () => (
  <div id="appq-loading-content">
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <img style={{ width: '100px' }} src={LoadingImg} alt="unguess loading" />
    </div>
  </div>
);

export default PageLoader;
