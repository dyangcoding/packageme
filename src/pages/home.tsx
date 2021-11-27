import React, { Fragment } from 'react';
import Introduction from '../home/Introduction';
import ImageToText from '../home/image-to-text';
import { ParcelList } from '../parcel/parcels';
import { AppState } from '../app/store';
import { connect } from 'react-redux';

interface HomeProps {
    readonly sessionID: string;
}

class HomeComponent extends React.Component<HomeProps> {
    private parcelsContainer: React.RefObject<HTMLDivElement>;

    constructor(props: HomeProps) {
        super(props);
        this.parcelsContainer = React.createRef();
    }

    public componentDidUpdate(prevProps: HomeProps): void {
        if (!prevProps.sessionID && this.props.sessionID && this.parcelsContainer.current) {
            this.parcelsContainer.current.scrollIntoView({behavior: 'smooth'});
        }
    }

    public render(): React.ReactNode {
        return (
            <Fragment>
                <Introduction />
                <div className="bg-gray-100">
                    <ImageToText />
                </div>
                <div ref={this.parcelsContainer}>
                    <ParcelList />
                </div>
            </Fragment>
        );
    }
}

function mapStateToProps(state: AppState): HomeProps {
    return {
        sessionID: state.users.sessionID,
    };
}

export const Home = connect(mapStateToProps)(HomeComponent);