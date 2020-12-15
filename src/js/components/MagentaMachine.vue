<template>
    <div class="wrapper">
        <div class="flex flex-col md:flex-row justify-center gap-3 md:gap-8 mb-8 xl:gap-16 md:mb-16">
            <div>
                <div class="font-michroma text-left md:text-center mb-4 text-base md:text-sm xl:text-base">
                    drums
                </div>

                <div class="flex flex-row md:grid md:grid-cols-2 gap-3 md:gap-2 xl:gap-4">
                    <button
                        v-for="player in _.filter(players, (p) => { return p.sample.type == 'drums' })"
                        v-bind:key="player.sample.id"
                        @click="toggle(player.sample.id)"
                        :disabled="player.howl.state() != 'loaded'"
                        class="focus:outline-none button button-music button-blue"
                        :class="{ active: player.howl.volume() == 1 }">
                    </button>
                </div>
            </div>
            <div>
                <div class="font-michroma text-left md:text-center mb-4 text-base md:text-sm xl:text-base">
                    bass
                </div>

                <div class="flex flex-row md:grid md:grid-cols-2 gap-3 md:gap-2 xl:gap-4">
                    <button
                        v-for="player in _.filter(players, (p) => { return p.sample.type == 'bass' })"
                        v-bind:key="player.sample.id"
                        @click="toggle(player.sample.id)"
                        :disabled="player.howl.state() != 'loaded'"
                        class="focus:outline-none button button-music button-red"
                        :class="{ active: player.howl.volume() == 1 }">
                    </button>
                </div>
            </div>
            <div>
                <div class="font-michroma text-left md:text-center mb-4 text-base md:text-sm xl:text-base">
                    vocals
                </div>

                <div class="flex flex-row md:grid md:grid-cols-2 gap-3 md:gap-2 xl:gap-4">
                    <button
                        v-for="player in _.filter(players, (p) => { return p.sample.type == 'vocals' })"
                        v-bind:key="player.sample.id"
                        @click="toggle(player.sample.id)"
                        :disabled="player.howl.state() != 'loaded'"
                        class="focus:outline-none button button-music button-green"
                        :class="{ active: player.howl.volume() == 1 }">
                    </button>
                </div>
            </div>
            <div>
                <div class="font-michroma text-left md:text-center mb-4 text-base md:text-sm xl:text-base">
                    other
                </div>

                <div class="flex flex-row md:grid md:grid-cols-2 gap-3 md:gap-2 xl:gap-4">
                    <button
                        v-for="player in _.filter(players, (p) => { return p.sample.type == 'other' })"
                        v-bind:key="player.sample.id"
                        @click="toggle(player.sample.id)"
                        :disabled="player.howl.state() != 'loaded'"
                        class="focus:outline-none button button-music button-yellow"
                        :class="{ active: player.howl.volume() == 1 }">
                    </button>
                </div>
            </div>
        </div>

        <div class="fixed z-10 inset-0 overflow-y-auto font-michroma" v-show="shareVisible">
            <div class="min-h-screen pt-4 px-4 text-center sm:block sm:p-0">
                <div class="fixed inset-0 transition-opacity">
                    <div class="absolute inset-0 bg-radial-gradient opacity-75"></div>
                </div>

                <span class="hidden sm:inline-block sm:align-middle sm:h-screen"></span>&#8203;

                <div class="inline-block bg-radial-gradient text-white text-left overflow-hidden shadow-xl transform transition-all my-8 align-middle max-w-lg w-full">
                    <div class="p-4">
                        <div class="mb-2">Share this link with your friends :</div>
                        <input type="text" class="block form-control mx-auto focus:outline-none px-3 py-2 font-michroma w-full" readonly v-model="shareUrl">
                    </div>

                    <div class="p-4">
                        <button @click="shareVisible = false" class="focus:outline-none button button-red py-2 font-michroma uppercase block" style="width: 100%; height: auto; line-height: initial;">Close</button>
                    </div>
                </div>
            </div>
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
            document.querySelectorAll('.share-link').forEach((el) => {
                el.addEventListener('click', (evt) => {
                    this.showShareUrl();
                })
            })

            // Audio
            await this.loadSample( 4, 'bass', 'bass_chance', '/audio/bass_chance.mp3')
            await this.loadSample( 5, 'drums', 'drums_chance', '/audio/drums_chance.mp3')
            await this.loadSample( 6, 'vocals', 'vocals_chance', '/audio/vocals_chance.mp3')
            await this.loadSample( 7, 'other', 'other_chance', '/audio/other_chance.mp3')

            await this.loadSample( 8, 'bass', 'bass_lapaix', '/audio/bass_lapaix.mp3')
            await this.loadSample( 9, 'drums', 'drums_lapaix', '/audio/drums_lapaix.mp3')
            await this.loadSample(10, 'vocals', 'vocals_lapaix', '/audio/vocals_lapaix.mp3')
            await this.loadSample(11, 'other', 'other_lapaix', '/audio/other_lapaix.mp3')

            await this.loadSample(12, 'bass', 'bass_nikki', '/audio/bass_nikki.mp3')
            await this.loadSample(13, 'drums', 'drums_nikki', '/audio/drums_nikki.mp3')
            await this.loadSample(14, 'vocals', 'vocals_nikki', '/audio/vocals_nikki.mp3')
            await this.loadSample(15, 'other', 'other_nikki', '/audio/other_nikki.mp3')

            await this.loadSample( 1, 'bass', 'bass_2019', '/audio/bass_2019.mp3')
            await this.loadSample( 2, 'drums', 'drums_2019', '/audio/drums_2019.mp3')
            await this.loadSample( 3, 'other', 'other_2019', '/audio/other_2019.mp3')

            // await this.loadSample(16, 'drums', 'drums_longfeu', '/audio/drums_longfeu.mp3')
            // await this.loadSample(17, 'vocals', 'vocals_longfeu', '/audio/vocals_longfeu.mp3')
            // await this.loadSample(18, 'other', 'other_longfeu', '/audio/other_longfeu.mp3')

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