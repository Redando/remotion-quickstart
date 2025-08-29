import { bundle } from '@remotion/bundler'
import { renderMedia, renderStill, selectComposition } from '@remotion/renderer'
import path from 'node:path'

export class RenderService {
    static renderImage = async (compositionId, inputProps, output, imageFormat) => {
    
        // * Create Remotion bundle
        let bundleLocation = await bundle({
            entryPoint: path.resolve('./src/index.ts'),
            webpackOverride: (config) => config
        })
    
        // * Select the composition
        let composition = await selectComposition({
            serveUrl: bundleLocation,
            id: compositionId,
            inputProps,
        })
    
        // * Render still image
        await renderStill({
            composition,
            serveUrl: bundleLocation,
            imageFormat,
            output,
            inputProps,
        })
    
    }
    static renderVideo = async (compositionId, inputProps, output) => {
    
        // * Create Remotion bundle
        let bundleLocation = await bundle({
            entryPoint: path.resolve('./src/index.ts'),
            webpackOverride: (config) => config
        })
    
        // * Select the composition
        let composition = await selectComposition({
            serveUrl: bundleLocation,
            id: compositionId,
            inputProps,
        })
    
        // * Render still video
        await renderMedia({
            composition,
            serveUrl: bundleLocation,
            codec: 'h264',
            outputLocation: output,
            onProgress: ({
                renderedFrames,
                encodedFrames,
                encodedDoneIn,
                renderedDoneIn,
            }) => {
                // * Progress Tracker
                // Amount of frames rendered into images
                process.stdout.write(`\r ${renderedFrames} rendered ${encodedFrames} encoded`)
                // Amount of frame encoded into a video
                if (renderedDoneIn !== null) {
                    process.stdout.write(`\r Rendered in ${renderedDoneIn}ms ${encodedFrames} encoded`)
                }
                if (encodedDoneIn !== null) {
                    process.stdout.write(`\r Encoded in ${encodedDoneIn} ms`)
                }
            }
        })
    }
}