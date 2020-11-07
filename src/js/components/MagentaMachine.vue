<template>
    <div class="wrapper">
        <div class="flex flex-row justify-center gap-16 mb-16">
            <div>
                <div class="font-michroma text-center mb-4">
                    drums
                </div>

                <div class="grid grid-cols-2 gap-4">
                    <button
                        v-for="player in _.filter(players, (p) => { return p.sample.type == 'drums' })"
                        v-bind:key="player.sample.id"
                        @click="toggle(player.sample.id)"
                        :disabled="player.howl.state() != 'loaded'"
                        class="focus:outline-none button button-blue"
                        :class="{ active: player.howl.volume() == 1 }">
                    </button>
                </div>
            </div>
            <div>
                <div class="font-michroma text-center mb-4">
                    bass
                </div>

                <div class="grid grid-cols-2 gap-4">
                    <button
                        v-for="player in _.filter(players, (p) => { return p.sample.type == 'bass' })"
                        v-bind:key="player.sample.id"
                        @click="toggle(player.sample.id)"
                        :disabled="player.howl.state() != 'loaded'"
                        class="focus:outline-none button button-red"
                        :class="{ active: player.howl.volume() == 1 }">
                    </button>
                </div>
            </div>
            <div>
                <div class="font-michroma text-center mb-4">
                    vocals
                </div>

                <div class="grid grid-cols-2 gap-4">
                    <button
                        v-for="player in _.filter(players, (p) => { return p.sample.type == 'vocals' })"
                        v-bind:key="player.sample.id"
                        @click="toggle(player.sample.id)"
                        :disabled="player.howl.state() != 'loaded'"
                        class="focus:outline-none button button-green"
                        :class="{ active: player.howl.volume() == 1 }">
                    </button>
                </div>
            </div>
            <div>
                <div class="font-michroma text-center mb-4">
                    other
                </div>

                <div class="grid grid-cols-2 gap-4">
                    <button
                        v-for="player in _.filter(players, (p) => { return p.sample.type == 'other' })"
                        v-bind:key="player.sample.id"
                        @click="toggle(player.sample.id)"
                        :disabled="player.howl.state() != 'loaded'"
                        class="focus:outline-none button button-yellow"
                        :class="{ active: player.howl.volume() == 1 }">
                    </button>
                </div>
            </div>
        </div>

        <div class="font-michroma text-center" v-show="shareVisible">
            <div class="mb-2">Share this link with your friends :</div>
            <input type="text" class="block form-control mx-auto focus:outline-none px-3 py-2 font-michroma text-center" style="width: 32em" readonly v-model="shareUrl">
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import _ from 'lodash'
    import { Howl } from 'howler'

    export default {
        props: ['id'],
        data() {
            return {
                shareVisible: false,
                shareUrl: 'https://magenta-machine.localhost/#1-3-8-9',
                players: [],
            }
        },
        computed: {
            _() {
                return _;
            }
        },
        async mounted() {
            // Events
            document.getElementById('share-link').addEventListener('click', (evt) => {
                console.log(this, evt);
                this.showShareUrl();
            });

            // Audio
            await this.loadSample( 4, 'bass', 'bass_chance', '/src/audio/bass_chance.mp3')
            await this.loadSample( 5, 'drums', 'drums_chance', '/src/audio/drums_chance.mp3')
            await this.loadSample( 6, 'vocals', 'vocals_chance', '/src/audio/vocals_chance.mp3')
            await this.loadSample( 7, 'other', 'other_chance', '/src/audio/other_chance.mp3')

            await this.loadSample( 8, 'bass', 'bass_lapaix', '/src/audio/bass_lapaix.mp3')
            await this.loadSample( 9, 'drums', 'drums_lapaix', '/src/audio/drums_lapaix.mp3')
            await this.loadSample(10, 'vocals', 'vocals_lapaix', '/src/audio/vocals_lapaix.mp3')
            await this.loadSample(11, 'other', 'other_lapaix', '/src/audio/other_lapaix.mp3')

            await this.loadSample(12, 'bass', 'bass_nikki', '/src/audio/bass_nikki.mp3')
            await this.loadSample(13, 'drums', 'drums_nikki', '/src/audio/drums_nikki.mp3')
            await this.loadSample(14, 'vocals', 'vocals_nikki', '/src/audio/vocals_nikki.mp3')
            await this.loadSample(15, 'other', 'other_nikki', '/src/audio/other_nikki.mp3')

            await this.loadSample( 1, 'bass', 'bass_2019', '/src/audio/bass_2019.mp3')
            await this.loadSample( 2, 'drums', 'drums_2019', '/src/audio/drums_2019.mp3')
            await this.loadSample( 3, 'other', 'other_2019', '/src/audio/other_2019.mp3')

            // await this.loadSample(16, 'drums', 'drums_longfeu', '/src/audio/drums_longfeu.mp3')
            // await this.loadSample(17, 'vocals', 'vocals_longfeu', '/src/audio/vocals_longfeu.mp3')
            // await this.loadSample(18, 'other', 'other_longfeu', '/src/audio/other_longfeu.mp3')

            setTimeout(this.start, 100);
        },
        methods: {
            async loadSample(id, type, name, url){
                axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

                let enabledIds = [];
                let hash = window.location.hash.substr(1);
                if (hash) {
                    enabledIds = hash.split('-');
                }

                let howl = new Howl({
                    src: [url],
                    loop: true,
                    volume: (enabledIds.includes(id.toString()))
                })

                this.players.push({
                    howl: howl,
                    sample: {
                        id: id,
                        name: name,
                        type: type,
                        url: url,
                    }
                })
            },
            toggle(sampleId) {
                let player = _.find(this.players, (p) => { return p.sample.id == sampleId })

                if (player.howl.volume() == 1) {
                    player.howl.volume(0)
                } else {
                    _.filter(this.players, (p) => { return p.sample.type == player.sample.type })
                    .forEach((player) => { player.howl.volume(0) })

                    player.howl.volume(1)
                }

                this.buildShareUrl();
            },
            start(){
                let unloadedPlayer = _.find(this.players, (p) => { return p.howl.state() != 'loaded' })
                if (unloadedPlayer) return setTimeout(this.start, 100);

                this.players.forEach((player) => { player.howl.play() })
            },
            showShareUrl() {
                this.shareVisible = true;
            },
            buildShareUrl() {
                let shareIds = [];

                _.filter(this.players, (p) => { return p.howl.volume() == 1 })
                .forEach((player) => { shareIds.push(player.sample.id) })

                this.shareUrl = window.location.protocol + '//' + window.location.hostname + '/#' + shareIds.join('-')
                window.history.pushState({}, null, this.shareUrl)
            },
        }
    }
</script>