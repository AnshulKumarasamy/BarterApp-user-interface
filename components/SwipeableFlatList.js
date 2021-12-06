import React, { Component } from 'react';
import { Animated, StyleSheet, Dimensions, Text, TouchableOpacity, TouchableHighlight, View, } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import { SwipeListView } from 'react-native-swipe-list-view';
import db from '../config';

export default class SwipeableFlatlist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allNotifications: this.props.allNotifications,
        };
    }

    updateMarkAsRead = (notification) => {
        db.collection("all_notifications").doc(notification.doc_id).update({
            notification_status: "read"
        })
    }

    onSwipeChangeValue = swipeData => {
        var allNotifications = this.state.allNotifications;
        const { key, value } = swipeData;
        if (value < -Dimensions.get("window").width) {
            const newData = [...allNotifications];
            this.updateMarkAsRead(allNotifications[key]);
            newData.splice(key, 1)
            this.setState({
                allNotifications: newData
            })
        }
    }

    renderItem = data => (
        <Animated.View>
            <ListItem
                leftElement={<Icon name="item" type="font-awesome" color='#696969' />}
                title={data.item.item_name}
                titleStyle={{ color: 'black', fontWeight: 'bold' }}
                subtitle={data.item.message}
                bottomDivider
            />
        </Animated.View>
    );

    renderHiddenItem = () => (
        <View style={styles.rowBack}>
            <View style={[styles.backRightBtn, styles.backRightBtnRight]}>
                <Text style={styles.backTextWhite}>Mark as Read</Text>
            </View>
        </View>
    );

    render() {
        return (
            <View style={styles.container}>
                <SwipeListView
                    disableRightSwipe
                    data={this.state.allNotifications}
                    renderItem={this.renderItem}
                    renderHiddenItem={this.renderHiddenItem}
                    rightOpenValue={-Dimensions.get("window").width}
                    previewRowkey={'0'}
                    previewOpenValue={-40}
                    previewOpenDelay={3000}
                    onSwipeValueChange={this.onSwipeChangeValue}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
    },
    backTextWhite: {
        color: '#FFF',
    },
    rowFront: {
        alignItems: 'center',
        backgroundColor: '#CCC',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        justifyContent: 'center',
        height: 50,
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: '#DDD',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
    },
    backRightBtn: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 75,
    },
    backRightBtnLeft: {
        backgroundColor: 'blue',
        right: 75,
    },
    backRightBtnRight: {
        backgroundColor: 'red',
        right: 0,
    },
});