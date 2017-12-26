/**
 * Created by lzx on 2017/12/26.
 */
import React, {Component} from 'react';

import {
    View,
    ListView,
    RefreshControl,
    Text
} from 'react-native'

import {
    NavBar
} from 'PAFFCommon'

class testScreen1 extends Component{
    constructor(props){
        super(props)
        let dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        this.state = {
            dataSource: dataSource,
            data: ['a','b'],
            isRefreshing: false
        }

    }

    render(){
        return(
            <View style={{flex:1, backgroundColor: 'white'}}>
                <NavBar title = 'asdasd' onBackPress={_=>this.props.navigator.pop()}/>
                <ListView dataSource={this.state.dataSource.cloneWithRows(this.state.data)}
                          renderRow={this._renderRow.bind(this)}
                          refreshControl={
                              <RefreshControl
                                  refreshing={this.state.isRefreshing}
                                  onRefresh={this._onRefresh.bind(this)}
                                  tintColor="#ff0000"
                                  title="Loading..."
                                  titleColor="#00ff00"
                                  colors={['#ff0000', '#00ff00', '#0000ff']}
                                  progressBackgroundColor="#ffff00"
                              />
                          }
                          />
            </View>
        )
    }

    _onRefresh(){
        this.setState({isRefreshing: true});
        setTimeout(() => {
            // prepend 10 items
            const rowData = Array.from(new Array(10))
                .map((val, i) => ({
                    text: 'Loaded row ' + (+this.state.loaded + i),
                    clicks: 0,
                }))
                .concat(this.state.data);

            this.setState({
                isRefreshing: false,
                data: rowData,
            });
        }, 5000);
    }

    _renderRow(rowData){
        return(
            <View>
                <Text>asd</Text>
            </View>
        )
    }
}

module.exports = testScreen1