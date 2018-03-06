import React, { Component } from 'react';
import { View, Text, Platform, ScrollView, Linking } from 'react-native';
import { Button, Card, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { MapView } from 'expo';

class ReviewsSCreen extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Review Jobs',
            tabBarIcon: ({ tintColor }) => (
                <Icon 
                    name="favorite"
                    size={25}
                    color={tintColor}
                />
            ),
            headerRight: (
                <Button 
                    title='Settings'
                    onPress={() => navigation.navigate('settings')}
                    backgroundColor="rgba(0,0,0,0)"
                    color="rgba(0, 122, 255, 1)"
                />
            ),
            style: {
                marginTop: Platform.OS === 'android' ? 24 : 0
            }
        };
    }

    renderLikedJobs() {
        return this.props.likedJobs.map(job => {
            const {
                company, 
                formattedRelativeTime, 
                url,
                longitude,
                latitude,
                jobkey,
                jobtitle
            } = job; 

            const initialRegion = {
                longitude,
                latitude,
                longitudeDelta: 0.045,
                latitudeDelta: 0.02
            };

            return (
                <Card key={jobkey} title={jobtitle}>
                    <View style={{ height: 200 }}>
                        <MapView 
                            style={{ flex: 1}}
                            cacheEnabled={true}
                            scrollEnabled={false}
                            initialRegion={initialRegion}
                        />
                        <View style={styles.detailWrapper}>
                            <Text style={styles.italics}>
                                {company}
                            </Text>
                            <Text style={styles.italics}>
                                {formattedRelativeTime}
                            </Text>
                        </View>
                        <Button 
                            title="Apply Now!"
                            backgroundColor="#03A9F4"
                            onPress={() => Linking.openURL(url)}
                        />
                    </View>
                </Card>
            );
        });
    }

    render() {
        return (
            <ScrollView>
                {this.renderLikedJobs()}
            </ScrollView>
        );
    }
}

const styles = {
    detailWrapper: {
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10
    },
    italics: {
        fontStyle: 'italic'
    }
}

const mapStateToProps = ({ likedJobs }) => {
    return { likedJobs };
};

export default connect(mapStateToProps)(ReviewsSCreen);