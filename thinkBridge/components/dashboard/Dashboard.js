import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity, TextInput, KeyboardAvoidingView, ScrollView, ImageBackground, StyleSheet, ActionSheetIOS, Modal, BackHandler } from 'react-native'
import { h, w, width, height, Icon, isTablet, fontFamily, fontFamilyBold } from '../../utils/helpers'
import { connect } from 'react-redux'
import bg from '../../assets/images/bg.jpeg'
import { getAllCategory } from '../../actions/categories'
class Home extends Component {
    constructor(props) {
        super(props)
        this.default = {
            search: '',
            categories: [],
            categoriesAll: []
        }
        this.state = this.default
        this.props.dispatch(getAllCategory())
    }
    componentDidMount() {
        this._isMounted = true
        if (this._isMounted) {
            const { allCategories } = this.props
            this.setState({
                categories: allCategories,
                categoriesAll: allCategories
            })
        }
    }


    componentWillUnmount() {
        this._isMounted = false
    }

    componentDidUpdate(prevProps) {
        const { allCategories } = this.props
        if (prevProps.allCategories !== allCategories) {
            this.setState({
                categories: allCategories,
                categoriesAll: allCategories
            })
        }

    }

    onSearch = (category) => {
        const { categoriesAll } = this.state
        this.setState({
            search: category
        }, () => {
            if (category !== '') {
                const arr = []
                categoriesAll.map(data => {
                    if ((data.name).toLowerCase().includes((category).toLowerCase())) {
                        arr.push(data)
                    }
                })
                this.setState({
                    categories: arr
                })
            } else {
                this.setState({
                    categoriesAll: categoriesAll,
                    categories: categoriesAll
                })
            }
        })

    }

    render() {
        const { categories } = this.state

        return (
            <View style={styles.container}>
                <ImageBackground source={bg} resizeMode='stretch' style={styles.imageBackground}>
                    <View style={styles.imageBackgroundViewOne}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Favourites')}>
                            <View style={styles.addCategoryAndFavourites}>
                                <Icon name="fi-sr-heart" style={styles.icon} size={width / 15} color="#ff56b9" />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.searchMainDiv}>
                        <View style={styles.searchChildDiv}>
                            <TextInput
                                autoCapitalize='none'
                                value={this.state.search}
                                onChangeText={(text) => this.onSearch(text)}
                                style={styles.searchBoxDiv}
                                placeholder='Search Categories'
                                placeholderTextColor='grey'
                            />
                            <Icon name="fi-rr-search" size={width / 18} style={styles.icon} color="#ff56b9" />
                        </View>
                    </View>
                </ImageBackground>
                <View style={styles.divTwo}>
                    {categories.map((data, index) => {
                        return (
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('CategoryDetails', { name: data.name })}>
                                <View style={styles.divCategoryMain}>
                                    <View key={index} style={styles.allCategories}>
                                        <Text style={styles.categortTextStyle}>{(data.name.split('')[0]).toUpperCase()}</Text>
                                    </View>
                                    <Text style={styles.headerTextStyle}>{data.name}</Text>
                                </View>
                            </TouchableOpacity>
                        )
                    })}
                </View>
                <View style={styles.uploadButtonDiv}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('UploadImage')}>
                        <View style={styles.uploadButton}>
                            <Icon name="fi-rr-upload" style={styles.icon} size={width / 15} color="#fff" />
                        </View>
                    </TouchableOpacity>
                </View>
            </View >
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffe2ff'
    },
    imageBackground: {
        width: w,
        paddingBottom: h / 25
    },
    imageBackgroundViewOne: {
        width: w / 1.1,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: width / 50,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        padding: width / 50
    },
    addCategoryAndFavourites: {
        width: width / 9,
        height: width / 9,
        borderRadius: width / 18,
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 2,

    },
    icon: {
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 'auto',
        marginBottom: 'auto'
    },
    searchMainDiv: {
        width: w / 1.08,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: width / 15,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    searchChildDiv: {
        flexDirection: 'row',
        borderWidth: 1,
        borderRadius: w / 40,
        borderColor: '#fff',
        backgroundColor: '#fff',
        width: w / 1.1,
        height: width / 8
    },
    searchBoxDiv: {
        fontSize: width / 28,
        fontFamily: fontFamily,
        color: '#333',
        width: w / 1.25,
        height: width / 8,
        paddingLeft: width / 30,
        paddingBottom: 'auto',
        paddingTop: 'auto',
    },
    divTwo: {
        width: w / 1.1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: width / 30,
    },
    divCategoryMain: {
        width: w / 4,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: width / 30,
    },
    allCategories: {
        marginTop: width / 30,
        width: width / 6,
        height: width / 6,
        borderRadius: width / 12,
        backgroundColor: '#ff56b9',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 2,
    },
    categortTextStyle: {
        fontSize: width / 12,
        fontFamily: fontFamilyBold,
        color: '#fff',
        marginBottom: 'auto',
        marginTop: 'auto',
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    headerTextStyle: {
        fontSize: width / 25,
        fontFamily: fontFamilyBold,
        color: '#333',
        marginLeft: 'auto',
        marginRight: 'auto',
        textAlign: 'center',
        marginTop: width / 30
    },
    uploadButtonDiv: {
        position: 'absolute',
        bottom: width / 30,
        width: w
    },
    uploadButton: {
        width: width / 7,
        height: width / 7,
        borderRadius: width / 14,
        backgroundColor: '#f594df',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 2,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
});


function mapStateToProps(data) {
    return {
        allCategories: data.categories.categories
    }
}

export default connect(mapStateToProps)(Home)

