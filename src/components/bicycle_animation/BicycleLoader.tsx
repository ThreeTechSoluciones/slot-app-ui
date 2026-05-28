import { DEFAULT_TEXT_COLOR } from '../../utils/Stylesheet';
import * as s from './BicycleLoader.styles';
import ProgressBar from '../progress_track/ProgressBar';
import Loader from '../loader/Loader';
const BicycleLoader = () => {
  return (
    <Loader>
      <s.Container>
        <s.GlobalStyle />
        <s.Svg viewBox="0 0 160 100" width="200" height="125">
          {/* Sol */}
          <s.Sun cx={83} cy={25} r={25} />
          <s.MiniSun cx={40} cy={34} r={15} />

          {/* Ruedas */}
          <s.Wheel cx={32} cy={73} r={22} />
          <s.InnerWheel cx={32} cy={73} r={14} />

          <s.Wheel cx={125} cy={72} r={22} />
          <s.InnerWheel cx={125} cy={72} r={14} />

          {/* Marco */}
          <s.FrameLine x1={51} y1={61} x2={85} y2={34} />
          <s.FrameLine x1={82} y1={24} x2={107} y2={59} />
          <s.FrameLine x1={54} y1={43} x2={60} y2={54} />
          <s.FrameLine x1={45} y1={41} x2={64} y2={41} />
          <s.FrameLine x1={82} y1={22} x2={96} y2={22} />

          {/* Pedal */}
          <s.PedalRing cx={80} cy={76} r={6} />
          <s.PedalCenter cx={80} cy={76} r={2.5} />
          <g
            style={{
              transformOrigin: '80px 76px',
              animation: 'pedalSpin 1.2s linear infinite',
            }}
          >
            <circle cx={71} cy={76} r={2} fill={DEFAULT_TEXT_COLOR} />
            <circle cx={89} cy={76} r={2} fill={DEFAULT_TEXT_COLOR} />
          </g>
        </s.Svg>
        <ProgressBar />
      </s.Container>
    </Loader>
  );
};

export default BicycleLoader;
