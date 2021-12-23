import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity, TextInput, KeyboardAvoidingView, ScrollView, ImageBackground, StyleSheet, ActionSheetIOS, Modal, BackHandler, Permission } from 'react-native'
import { h, w, width, height, Icon, isTablet, fontFamily, fontFamilyBold } from '../../utils/helpers'
import { connect } from 'react-redux'
import { getAllCategory, addCategory, addPhotoInCategory } from '../../actions/categories'
import * as ImagePicker from 'react-native-image-picker';
import { request, PERMISSIONS, check, RESULTS } from 'react-native-permissions';


class UploadImages extends Component {
    constructor(props) {
        super(props)
        this.default = {
            search: '',
            categories: [],
            categoryName: '',
            modalVisible: false,
            modalVisibleTwo: false,
            imageURI: '',
            selectedCategoryToUpload: 'Landscape'
        }
        this.state = this.default
        this.props.dispatch(getAllCategory())
    }
    componentDidMount() {
        this._isMounted = true
        if (this._isMounted) {
            const { allCategories } = this.props
            this.setState({
                categories: allCategories
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
                categories: allCategories
            })
        }

    }

    setModalVisible = (status) => {
        this.setState({
            modalVisible: status
        })
    }

    setModalVisibleTwo = (status) => {
        this.setState({
            modalVisibleTwo: status
        })
    }

    addCategory = () => {
        const { categoryName, categories } = this.state
        const filterCheck = categories.filter(d => (d.name).toLowerCase() === (categoryName).toLowerCase())
        if (categoryName !== '' && filterCheck.length === 0) {
            const obj = {
                name: categoryName,
                photos: []
            }
            this.props.dispatch(addCategory(obj))
        }
        this.setModalVisible(false)
        this.setState({
            categoryName: ''
        })
    }

    onPressCont = () => {
        const { imageURI, selectedCategoryToUpload } = this.state
        const obj = {
            name: selectedCategoryToUpload,
            image: imageURI
        }
        this.props.dispatch(addPhotoInCategory(obj))
    }

    onSelectCategory = (name) => {
        this.setState({
            selectedCategoryToUpload: name
        })
        this.setModalVisibleTwo(true)
    }

    openCamera = () => {
        if (Platform.OS === 'android') {
            check(PERMISSIONS.ANDROID.CAMERA)
                .then(result => {
                    switch (result) {

                        case RESULTS.DENIED:
                            request(PERMISSIONS.ANDROID.CAMERA).then(result => {
                                if (result === 'granted') {
                                    const options = {
                                        maxWidth: 200,
                                        maxHeight: 200,
                                    }
                                    ImagePicker.launchCamera(options, (response) => {
                                        if (response.didCancel) {
                                            this.setState({
                                                imageURI: ''
                                            })
                                        } else {
                                            this.setState({
                                                imageURI: {
                                                    name: response.assets[0].fileName,
                                                    uri: response.assets[0].uri,
                                                    type: response.assets[0].type,
                                                    size: response.assets[0].fileSize,
                                                    isFav: false
                                                }
                                            }, () => {
                                                this.onPressCont()
                                                this.setModalVisibleTwo(false)
                                            })
                                        }


                                    });
                                }
                            });
                            break;
                        case RESULTS.GRANTED:
                            const options = {
                                maxWidth: 200,
                                maxHeight: 200,
                            }
                            ImagePicker.launchCamera(options, (response) => {
                                if (response.didCancel) {
                                    this.setState({
                                        imageURI: ''
                                    })
                                } else {
                                    this.setState({
                                        imageURI: {
                                            name: response.assets[0].fileName,
                                            uri: response.assets[0].uri,
                                            type: response.assets[0].type,
                                            size: response.assets[0].fileSize,
                                            isFav: false
                                        }
                                    }, () => {
                                        this.onPressCont()
                                        this.setModalVisibleTwo(false)
                                    })
                                }

                            });
                            break;
                        case RESULTS.BLOCKED:
                            Alert.alert('Allow the app for camera permissions from your phone settings');
                            break;
                    }
                })
        } else {
            check(PERMISSIONS.IOS.CAMERA)
                .then(result => {
                    switch (result) {

                        case RESULTS.DENIED:
                            request(PERMISSIONS.IOS.CAMERA).then(result => {
                                if (result === 'granted') {
                                    const options = {
                                        maxWidth: 200,
                                        maxHeight: 200,
                                    }
                                    ImagePicker.launchCamera(options, (response) => {
                                        if (response.didCancel) {
                                            this.setState({
                                                imageURI: ''
                                            })
                                        } else {
                                            this.setState({
                                                imageURI: {
                                                    name: response.assets[0].fileName,
                                                    uri: response.assets[0].uri,
                                                    type: response.assets[0].type,
                                                    size: response.assets[0].fileSize,
                                                    isFav: false
                                                }
                                            }, () => {

                                                this.onPressCont()
                                                this.setModalVisibleTwo(false)
                                            })
                                        }


                                    });
                                }
                            });
                            break;
                        case RESULTS.GRANTED:
                            const options = {
                                maxWidth: 200,
                                maxHeight: 200,
                            }
                            ImagePicker.launchCamera(options, (response) => {
                                if (response.didCancel) {
                                    this.setState({
                                        imageURI: ''
                                    })
                                } else {
                                    this.setState({
                                        imageURI: {
                                            name: response.assets[0].fileName,
                                            uri: response.assets[0].uri,
                                            type: response.assets[0].type,
                                            size: response.assets[0].fileSize,
                                            isFav: false
                                        }
                                    }, () => {
                                        this.onPressCont()
                                        this.setModalVisibleTwo(false)
                                    })
                                }

                            });
                            break;
                        case RESULTS.BLOCKED:
                            alert('Allow the app for camera permissions from your phone settings');
                            break;
                    }
                })
        }



    }

    openImageLibrary = () => {
        if (Platform.OS === 'android') {
            check(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE)
                .then(result => {
                    switch (result) {

                        case RESULTS.DENIED:
                            request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE).then(result => {
                                if (result === 'granted') {
                                    const options = {
                                        maxWidth: 200,
                                        maxHeight: 200,
                                    }
                                    ImagePicker.launchImageLibrary(options, (response) => {
                                        if (response.didCancel) {
                                            this.setState({
                                                imageURI: ''
                                            })
                                        } else {
                                            this.setState({
                                                imageURI: {
                                                    name: response.assets[0].fileName,
                                                    uri: response.assets[0].uri,
                                                    type: response.assets[0].type,
                                                    size: response.assets[0].fileSize,
                                                    isFav: false
                                                }
                                            }, () => {
                                                this.onPressCont()
                                                this.setModalVisibleTwo(false)
                                            })
                                        }


                                    });
                                }
                            });
                            break;
                        case RESULTS.GRANTED:
                            const options = {
                                maxWidth: 200,
                                maxHeight: 200,
                            }
                            ImagePicker.launchImageLibrary(options, (response) => {
                                if (response.didCancel) {
                                    this.setState({
                                        imageURI: ''
                                    })
                                } else {
                                    this.setState({
                                        imageURI: {
                                            name: response.assets[0].fileName,
                                            uri: response.assets[0].uri,
                                            type: response.assets[0].type,
                                            size: response.assets[0].fileSize,
                                            isFav: false
                                        }
                                    }, () => {
                                        this.onPressCont()
                                        this.setModalVisibleTwo(false)
                                    })
                                }

                            });
                            break;
                        case RESULTS.BLOCKED:
                            Alert.alert('Allow the app for camera permissions from your phone settings');
                            break;
                    }
                })
        } else {
            check(PERMISSIONS.IOS.MEDIA_LIBRARY)
                .then(result => {
                    switch (result) {
                        case RESULTS.DENIED:
                            request(PERMISSIONS.IOS.MEDIA_LIBRARY).then(result => {
                                if (result === 'granted') {
                                    const options = {
                                        maxWidth: 200,
                                        maxHeight: 200,
                                    }
                                    ImagePicker.launchImageLibrary(options, (response) => {
                                        if (response.didCancel) {
                                            this.setState({
                                                imageURI: ''
                                            })
                                        } else {
                                            this.setState({
                                                imageURI: {
                                                    name: response.assets[0].fileName,
                                                    uri: response.assets[0].uri,
                                                    type: response.assets[0].type,
                                                    size: response.assets[0].fileSize,
                                                    isFav: false
                                                }
                                            }, () => {
                                                this.onPressCont()
                                                this.setModalVisibleTwo(false)
                                            })
                                        }


                                    });
                                }
                            });
                            break;
                        case RESULTS.GRANTED:
                            const options = {
                                maxWidth: 200,
                                maxHeight: 200,
                            }
                            ImagePicker.launchImageLibrary(options, (response) => {
                                if (response.didCancel) {
                                    this.setState({
                                        imageURI: ''
                                    })
                                } else {
                                    this.setState({
                                        imageURI: {
                                            name: response.assets[0].fileName,
                                            uri: response.assets[0].uri,
                                            type: response.assets[0].type,
                                            size: response.assets[0].fileSize,
                                            isFav: false
                                        }
                                    }, () => {
                                        this.onPressCont()
                                        this.setModalVisibleTwo(false)
                                    })
                                }

                            });
                            break;
                        case RESULTS.BLOCKED:
                            alert('Allow the app for library permissions from your phone settings');
                            break;
                    }
                })
        }


    }

    render() {
        const { categories } = this.state
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                    <View style={styles.divOne}>
                        <Icon name="fi-rr-angle-left" style={styles.iconBack} size={width / 18} color="#00" />
                        <Text style={styles.headerText}>Upload Images</Text>
                    </View>
                </TouchableOpacity>
                <ScrollView contentContainerStyle={styles.scroll}>
                    <TouchableOpacity onPress={() => this.setModalVisible(true)}>
                        <View style={styles.addCategory}>
                            <Icon name="fi-rr-add" style={styles.iconAdd} size={width / 15} color="#880e4f" />
                            <Text style={styles.categoryAddText}>Add Category</Text>
                        </View>
                    </TouchableOpacity>
                    {categories.map((data, index) => {
                        return (
                            <TouchableOpacity onPress={() => this.onSelectCategory(data.name)}>
                                <View key={index} style={styles.addCategory}>
                                    <Text style={styles.categoryText}>{data.name}</Text>
                                </View>
                            </TouchableOpacity>
                        )
                    })}
                </ScrollView>
                <Modal
                    transparent={true}
                    visible={this.state.modalVisible}
                >
                    <View style={styles.modalOneDivOne}>
                        <View style={styles.modalOneDivTwo}>
                            <View style={styles.searchMainDiv}>
                                <View style={styles.searchChildDiv}>
                                    <TextInput
                                        autoCapitalize='none'
                                        value={this.state.categoryName}
                                        onChangeText={(text) => this.setState({ categoryName: text })}
                                        style={styles.searchBoxDiv}
                                        placeholder='Add Category'
                                        placeholderTextColor='grey'
                                    />
                                    <Icon name="fi-rr-add" size={width / 18} style={styles.iconBack} color="#880e4f" />
                                </View>
                            </View>
                            <TouchableOpacity onPress={() => this.addCategory()}>
                                <View style={styles.addDiv}>
                                    <Text style={styles.textAdd}>Add</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.setModalVisible(false)}>
                                <View style={styles.divCross}>
                                    <Icon name="fi-rr-cross" size={width / 30} style={styles.iconBack} color="#fff" />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                <Modal
                    transparent={true}
                    visible={this.state.modalVisibleTwo}
                >
                    <View style={styles.modalTwoDivOne}>
                        <View style={styles.modalTwoDivTwo}>
                            <TouchableOpacity onPress={() => this.setModalVisibleTwo(false)}>
                                <Icon name="fi-rr-cross-small" size={width / 15} color={'#324367'} style={styles.modalTwoIcons} />
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity onPress={() => this.openCamera()}>
                            <Text style={styles.modalTwoText}>Take Photo</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.openImageLibrary()}>
                            <Text style={styles.modalTwoText}>Open Library</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>

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
    addCategory: {
        width: w / 1.1,
        marginLeft: 'auto',
        marginRight: 'auto',
        flexDirection: 'row',
        marginTop: width / 20,
        borderBottomWidth: 0.5,
        borderBottomColor: 'grey',
        paddingBottom: width / 60
    },
    iconAdd: {
        marginTop: 'auto',
        marginBottom: 'auto'
    },
    categoryAddText: {
        fontSize: width / 22,
        fontFamily: fontFamilyBold,
        color: '#880e4f',
        marginLeft: width / 30
    },
    categoryText: {
        fontSize: width / 25,
        fontFamily: fontFamily,
        color: '#880e4f',
        marginLeft: width / 30
    },
    modalOneDivOne: {
        marginTop: 'auto',
        marginBottom: 'auto',
    },
    modalOneDivTwo: {
        backgroundColor: '#fff',
        marginLeft: 'auto',
        marginRight: 'auto',
        width: w / 1.1,
        borderRadius: 8,
        padding: width / 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    searchMainDiv: {
        width: w / 1.2,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: width / 30,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    searchChildDiv: {
        flexDirection: 'row',
        borderWidth: 1,
        borderRadius: w / 40,
        borderColor: '#880e4f',
        backgroundColor: '#fff',
        width: w / 1.3,
        height: width / 8
    },
    searchBoxDiv: {
        fontSize: width / 28,
        fontFamily: fontFamily,
        color: '#333',
        width: w / 1.5,
        height: width / 8,
        paddingLeft: width / 30,
        paddingBottom: 'auto',
        paddingTop: 'auto',
    },
    divCross: {
        width: width / 12,
        height: width / 12,
        borderRadius: width / 24,
        backgroundColor: '#c62828',
        justifyContent: 'center',
        alignItems: 'center',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 2,
        marginTop: width / 30
    },
    addDiv: {
        width: width / 3,
        padding: width / 50,
        borderRadius: 5,
        marginLeft: 'auto',
        marginRight: 'auto',
        backgroundColor: '#880e4f',
        marginTop: width / 30
    },
    textAdd: {
        textAlign: 'center',
        fontFamily: fontFamily,
        fontSize: width / 25,
        color: '#fff'
    },
    modalTwoDivOne: {
        bottom: 0, position: 'absolute',
        backgroundColor: 'white',
        paddingBottom: width / 15,
        width: w,
        borderTopLeftRadius: width / 10,
        borderTopRightRadius: width / 10,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 2,
    },
    modalTwoDivTwo: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        width: w / 1.2,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: width / 20
    },
    modalTwoIcons: {
        marginLeft: 'auto',
        marginTop: 'auto',
        marginBottom: 'auto',
        marginRight: 'auto'
    },
    modalTwoText: {
        width: w / 1.5,
        marginLeft: 'auto',
        marginRight: 'auto',
        borderBottomColor: 'grey',
        color: '#19164e',
        fontSize: width / 22,
        fontFamily: fontFamilyBold,
        textAlign: 'center',
        borderBottomWidth: 1,
        paddingBottom: width / 50,
        marginTop: width / 30,
    }
});


function mapStateToProps(data) {
    return {
        allCategories: data.categories.categories
    }
}

export default connect(mapStateToProps)(UploadImages)

