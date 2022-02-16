import React, { Component } from 'react'
import NavBarComponent from 'component/navbar-component'
import PlaylistSelectComponent from 'component/playlist-select-component'
import SearchInputComponent from 'component/search-input-component'
import SearchResultComponent from 'component/search-result-component'
import PlaylistData from 'service/playlist-data'
import MusicData from 'service/music-data'
import PlaylistContainer from 'container/playlist-container'
import DetailContainer from 'container/detail-container'
import '../css/style.css'
import RingLoader from 'react-spinners/RingLoader'

class MusicContainer extends Component {
    constructor (props) {
        super(props)
        this.musicData = new MusicData('yiXVQvJwxutiWQtPkvGVeoaCBHSdHxePMXTneTUN')
        this.state = {
            renderComponent: 'playlist',
            playlist: [],
            selectedPlaylistID: 1,
            searchValue: '',
            tracks: [],
            searchResult: [],
            loading: false,
            DetailTrackVideos: [],
            indexDetail: 0
        }
        this.handleInputSearchChange = this.handleInputSearchChange.bind(this)
        this.handleSearchButton = this.handleSearchButton.bind(this)
        this.handleDetail = this.handleDetail.bind(this)
        this.handleOnClickSelect = this.handleOnClickSelect.bind(this)
        this.handleBrandClick = this.handleBrandClick.bind(this)
    }

    componentDidMount () {
        PlaylistData.getAll(result => {
            this.setState({ playlist: result })
        })
        PlaylistData.getTracks(this.state.selectedPlaylistID, result => {
            this.setState({ tracks: result })
        })
    }

    handleInputSearchChange (event) {
        this.setState({ searchValue: event.target.value })
    }

    handleSearchButton () {
        if (this.state.searchValue !== '') {
            this.setState({ loading: true }, () => {
                this.musicData.search({ query: this.state.searchValue }, result => {
                    this.setState({ searchResult: result.results, renderComponent: 'search', loading: false })
                })
            })
        }
    }

    handleDetail (event) {
        event.preventDefault()
        this.setState({ renderComponent: 'detail', indexDetail: event.target.parentNode.id })
        fetch(this.state.searchResult[this.state.indexDetail].resource_url, { method: 'GET' })
            .then(response => response.json())
            .then(responseObject => {
                this.setState({ DetailTrackVideos: responseObject.videos })
            })
    }

    handleOnClickSelect (event) {
        this.setState({ selectedPlaylistID: parseInt(event.target.value) })
        PlaylistData.getTracks(parseInt(event.target.value), result => {
            this.setState({ tracks: result })
        })
    }

    handleBrandClick () {
        PlaylistData.getTracks(this.state.selectedPlaylistID, result => {
            this.setState({ tracks: result, renderComponent: 'playlist' })
        })
    }

    renderPlayList () {
        return (
            <PlaylistContainer tracks={this.state.tracks} />
        )
    }

    renderSearchResult () {
        return (
            <SearchResultComponent
                searchTracks={this.state.searchResult}
                id='tracks'
                onClickLink={this.handleDetail}
            />
        )
    }

    renderDetail () {
        return (
            <DetailContainer
                DetailTrack={this.state.searchResult[this.state.indexDetail]}
                DetailTrackVideos={this.state.DetailTrackVideos}
                playlistId={this.state.selectedPlaylistID}
                PlaylistData={PlaylistData}
                renderComponent={this.state.renderComponent}
            />
        )
    }

    componentToRender () {
        let render
        switch (this.state.renderComponent) {
        case 'detail':
            render = this.renderDetail()
            break
        case 'search':
            render = this.renderSearchResult()
            break
        default:
            render = this.renderPlayList()
        }
        return render
    }

    render () {
        return (
            <div>
                <NavBarComponent
                    id='navBarMusic'
                    playlistSelect={<PlaylistSelectComponent name='playlist' id='playlist' options={this.state.playlist} onClickSelect={this.handleOnClickSelect} />}
                    inputSearch={<SearchInputComponent id='search' name='search' placeholder='search' onChange={this.handleInputSearchChange} />}
                    onClickSearch={this.handleSearchButton}
                    onClickBrand={this.handleBrandClick}
                />
                {this.state.loading ? <RingLoader color='#2196f3' height={90} width={90} /> : (this.componentToRender())}
            </div>

        )
    }
}

export default MusicContainer
