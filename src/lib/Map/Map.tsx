import * as React from 'react';
import withYmaps, { WithYmaps } from '../YmapsProvider/withYmaps';
import MapContext from './MapContext';

type OwnProps = {
  /**
   * Map container styles.
   */
  containerStyle?: React.CSSProperties;
  /**
   * Map parameters.
   */
  defaultState?: ymaps.IMapState;
  /**
   * Map options.
   */
  defaultOptions?: ymaps.IMapOptions;
  /**
   * Callback, which will be called after creating the map.
   */
  instanceRef?: (map: ymaps.Map) => any;
};

type Props = OwnProps & WithYmaps;

type State = {
  map: ymaps.Map | null;
};

class Map extends React.Component<Props, State> {
  public static defaultProps: OwnProps = {
    containerStyle: {
      width: 600,
      height: 400,
    },
    defaultState: {
      // Moscow
      center: [55.76, 37.64],
      zoom: 10,
    },
    defaultOptions: {},
  };

  public state: State = {
    map: null,
  };

  public mapContainer = React.createRef<HTMLDivElement>();

  public componentDidMount() {
    const { ymaps, defaultState, defaultOptions, instanceRef } = this.props;
    const map = new ymaps.Map(
      this.mapContainer.current as HTMLElement,
      defaultState as ymaps.IMapState,
      defaultOptions,
    );
    this.setState({ map });
    instanceRef && instanceRef(map);
  }

  public render() {
    const { containerStyle, children } = this.props;
    const { map } = this.state;
    return (
      <div style={containerStyle} ref={this.mapContainer}>
        {map && (
          <MapContext.Provider value={map}>{children}</MapContext.Provider>
        )}
      </div>
    );
  }
}

export default withYmaps(Map);
