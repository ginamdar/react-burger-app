import React, {Component} from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";

class App extends Component {
    state = {
        show: true
    };

    componentDidMount(): void {
        setTimeout(() => {
            this.setState( {show: false} );
        }, 5000);
    }

    render() {
        return (
            <div>
                <Layout>
                    { this.show ? <BurgerBuilder></BurgerBuilder> : null }
                    {/*<BurgerBuilder></BurgerBuilder>*/}
                </Layout>
            </div>
        );
    }
}

export default App;
