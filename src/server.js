import { Constants } from './Constants.js'
import { RenderService } from './RenderService.js'

const execute = async () => {
    // * Render Image
    await RenderService.renderImage(
        'QuoteImage', // * Composition Id
        { quote: Constants.quote }, // * Input Props
        `./out/Quote-1.png`, // * Output path
        'png' // * image format
    ).then(() => console.log(`Render Successful`))

    // * Render Video
    // await RenderService.renderVideo(
    //     'QuoteVideo', // * Composition Id
    //     { quote: Constants.quote }, // * Input Props
    //     `./out/Quote-1.mp4` // * Output path
    // ).then(() => console.log(`\nRender Successful`))


}
execute()