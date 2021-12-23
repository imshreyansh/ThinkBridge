import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity, TextInput, KeyboardAvoidingView, ScrollView, ImageBackground, StyleSheet, ActionSheetIOS, Modal, BackHandler, Permission } from 'react-native'
import { h, w, width, height, Icon, isTablet, fontFamily, fontFamilyBold } from '../../utils/helpers'
import { connect } from 'react-redux'
import { getCategoryDetailsByCategory, toggleFavourite } from '../../actions/categories'



class CategoryDetails extends Component {
    constructor(props) {
        super(props)
        this.default = {
            categoryDetails: '',
            fav: []
        }
        this.state = this.default
        const { name } = this.props.route.params
        let obj = {
            name
        }
        this.props.dispatch(getCategoryDetailsByCategory(obj))
    }
    componentDidMount() {
        this._isMounted = true
        if (this._isMounted) {
            const { categoryDetails } = this.props
            this.setState({
                categoryDetails
            })
        }
    }


    componentWillUnmount() {
        this._isMounted = false
    }

    componentDidUpdate(prevProps) {
        const { categoryDetails, allCategories } = this.props
        if (prevProps.categoryDetails !== categoryDetails) {
            this.setState({
                categoryDetails
            })
        }
        if (prevProps.allCategories !== allCategories) {
            this.setState({
                categoryDetails: allCategories.filter(d => d.name === categoryDetails.name)[0]
            })
        }
    }

    onToggle = (a, b) => {
        const { categoryDetails } = this.props
        const obj = {
            name: categoryDetails.name,
            status: !b,
            index: a
        }

        this.props.dispatch(toggleFavourite(obj))
    }

    render() {
        const { categoryDetails } = this.state
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                    <View style={styles.divOne}>
                        <Icon name="fi-rr-angle-left" style={styles.iconBack} size={width / 18} color="#00" />
                        <Text style={styles.headerText}>{categoryDetails.name}</Text>
                    </View>
                </TouchableOpacity>
                <ScrollView contentContainerStyle={styles.scroll}>
                    <View style={styles.imageDivOne}>
                        {categoryDetails !== undefined && categoryDetails.photos !== undefined && categoryDetails.photos.map((d, index) => {
                            return (
                                <View key={index} style={styles.imageEachDiv}>
                                    <Image resizeMode="stretch" source={{ uri: d.uri }} style={styles.imageThumb} />
                                    <View style={styles.favouriteIcon}>
                                        {d.isFav ?
                                            <TouchableOpacity onPress={() => this.onToggle(index, d.isFav)}>
                                                <Icon name="fi-sr-heart" style={styles.icon} size={width / 18} color="#ff56b9" />
                                            </TouchableOpacity> :
                                            <TouchableOpacity onPress={() => this.onToggle(index, d.isFav)}>
                                                <Icon name="fi-rr-heart" style={styles.icon} size={width / 18} color="#ff56b9" />
                                            </TouchableOpacity>
                                        }
                                    </View>
                                </View>
                            )
                        })}
                    </View>
                </ScrollView>
            </View >
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffe2ff'
    },
    divOne: {
        width: w / 1.1,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: width / 30,
        flexDirection: 'row'
    },
    iconBack: {
        marginTop: 'auto',
        marginBottom: 'auto',
    },
    headerText: {
        fontSize: width / 22,
        fontFamily: fontFamily,
        color: '#000',
        marginLeft: width / 30
    },
    scroll: {
        paddingBottom: width / 30
    },
    imageDivOne: {
        width: w / 1.1,
        marginLeft: 'auto',
        marginRight: 'auto',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginTop: width / 20
    },
    imageEachDiv: {
        width: width / 2.4,
        backgroundColor: '#fff',
        height: width / 2.5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 2,
        marginTop: width / 30
    },
    imageThumb: {
        width: width / 2.6,
        height: width / 3.5,
        marginTop: width / 50,
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    favouriteIcon: {
        width: width / 2.5,
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    icon: {
        marginTop: width / 50
    }
});


function mapStateToProps(data) {
    return {
        categoryDetails: data.categories.categoryById,
        allCategories: data.categories.categories
    }
}

export default connect(mapStateToProps)(CategoryDetails)

