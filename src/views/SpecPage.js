import * as React from 'react';
import * as Mui from '../Components';
import { useTheme } from '@mui/material/styles';

export default function SpecPage() {
    const theme = useTheme();
    const [specs, setSpecs] = React.useState({});
    const [mediaSpecs, setMediaSpecs] = React.useState([]);

    const runMediaTests = async () => {
        const tests = [
            { name: "H.264 Main 480p 30fps", config: { type: 'file', video: { contentType: 'video/mp4; codecs="avc1.4D401E"', width: 852, height: 480, bitrate: 1210000, framerate: 30 } } },
            { name: "H.264 High 1080p 30fps", config: { type: 'file', video: { contentType: 'video/mp4; codecs="avc1.640028"', width: 1920, height: 1080, bitrate: 5000000, framerate: 30 } } },
            { name: "H.264 High 1080p 60fps", config: { type: 'file', video: { contentType: 'video/mp4; codecs="avc1.640032"', width: 1920, height: 1080, bitrate: 8000000, framerate: 60 } } },
            { name: "H.264 High 2K 60fps", config: { type: 'file', video: { contentType: 'video/mp4; codecs="avc1.640033"', width: 2560, height: 1440, bitrate: 10600000, framerate: 60 } } },
            { name: "H.265 (HEVC) 1080p", config: { type: 'file', video: { contentType: 'video/mp4; codecs="hev1.1.6.L93.B0"', width: 1920, height: 1080, bitrate: 4000000, framerate: 30 } } },
            { name: "VP9 1080p", config: { type: 'file', video: { contentType: 'video/webm; codecs="vp9"', width: 1920, height: 1080, bitrate: 4000000, framerate: 30 } } },
            { name: "AV1 1080p", config: { type: 'file', video: { contentType: 'video/webm; codecs="av01.0.08M.08"', width: 1920, height: 1080, bitrate: 4000000, framerate: 30 } } },
        ];

        if (navigator.mediaCapabilities) {
            const results = await Promise.all(tests.map(async (test) => {
                try {
                    const info = await navigator.mediaCapabilities.decodingInfo(test.config);
                    return {
                        ...test,
                        supported: info.supported,
                        smooth: info.smooth,
                        powerEfficient: info.powerEfficient
                    };
                } catch (e) {
                    return { ...test, supported: false, smooth: false, powerEfficient: false };
                }
            }));
            setMediaSpecs(results);
        } else {
            // Fallback for browsers without MediaCapabilities API
            const video = document.createElement('video');
            const results = tests.map(test => ({
                ...test,
                supported: video.canPlayType(test.config.video.contentType) !== "",
                smooth: "N/A",
                powerEfficient: "N/A"
            }));
            setMediaSpecs(results);
        }
    };

    React.useEffect(() => {
        const updateSpecs = () => {
            setSpecs({
                "User Agent": navigator.userAgent,
                "Platform": navigator.platform,
                "Language": navigator.language,
                "Device Pixel Ratio": window.devicePixelRatio,
                "Window Inner Width": window.innerWidth,
                "Window Inner Height": window.innerHeight,
                "Window Outer Width": window.outerWidth,
                "Window Outer Height": window.outerHeight,
                "Screen Width": window.screen.width,
                "Screen Height": window.screen.height,
                "Available Screen Width": window.screen.availWidth,
                "Available Screen Height": window.screen.availHeight,
                "Color Depth": window.screen.colorDepth,
                "Orientation": window.screen.orientation ? window.screen.orientation.type : 'N/A',
                "Touch Points": navigator.maxTouchPoints,
                "Cookies Enabled": navigator.cookieEnabled,
                "On Line": navigator.onLine,
            });
        };

        updateSpecs();
        runMediaTests();
        window.addEventListener('resize', updateSpecs);
        return () => window.removeEventListener('resize', updateSpecs);
    }, []);

    return (
        <Mui.Box sx={{ 
            p: 4, 
            minHeight: '100vh', 
            backgroundColor: theme.palette.background.default,
            color: theme.palette.text.primary
        }}>
            <Mui.Typography variant="h4" gutterBottom fontWeight="bold">
                WebView Specifications
            </Mui.Typography>
            <Mui.Typography variant="body2" sx={{ mb: 4, color: 'text.secondary' }}>
                Use this information to debug layout issues on specific devices.
            </Mui.Typography>

            <Mui.Grid container spacing={2}>
                {Object.entries(specs).map(([key, value]) => (
                    <Mui.Grid item xs={12} md={6} key={key}>
                        <Mui.Paper elevation={0} sx={{ 
                            p: 2, 
                            borderRadius: '16px', 
                            border: '1px solid',
                            borderColor: 'divider',
                            backgroundColor: theme.palette.background.paper
                        }}>
                            <Mui.Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 0.5 }}>
                                {key}
                            </Mui.Typography>
                            <Mui.Typography variant="body1" sx={{ wordBreak: 'break-all', fontWeight: 'medium' }}>
                                {String(value)}
                            </Mui.Typography>
                        </Mui.Paper>
                    </Mui.Grid>
                ))}
            </Mui.Grid>

            <Mui.Typography variant="h5" sx={{ mt: 6, mb: 2, fontWeight: 'bold' }}>
                Media Capabilities
            </Mui.Typography>
            <Mui.Typography variant="body2" sx={{ mb: 4, color: 'text.secondary' }}>
                Diagnostic tests for hardware media decoding limits. Green indicates standard hardware support.
            </Mui.Typography>

            <Mui.Grid container spacing={2}>
                {mediaSpecs.map((spec) => (
                    <Mui.Grid item xs={12} md={6} lg={4} key={spec.name}>
                        <Mui.Paper elevation={0} sx={{ 
                            p: 2, 
                            borderRadius: '16px', 
                            border: '1px solid',
                            borderColor: spec.supported ? (spec.smooth ? 'success.main' : 'warning.main') : 'error.main',
                            backgroundColor: theme.palette.background.paper,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 1
                        }}>
                            <Mui.Typography variant="subtitle1" fontWeight="bold">
                                {spec.name}
                            </Mui.Typography>
                            
                            <Mui.Box sx={{ display: 'flex', gap: 2 }}>
                                <Mui.Box>
                                    <Mui.Typography variant="caption" display="block" color="text.secondary">Supported</Mui.Typography>
                                    <Mui.Typography variant="body2" color={spec.supported ? "success.main" : "error.main"}>
                                        {spec.supported ? "Yes" : "No"}
                                    </Mui.Typography>
                                </Mui.Box>
                                <Mui.Box>
                                    <Mui.Typography variant="caption" display="block" color="text.secondary">Smooth</Mui.Typography>
                                    <Mui.Typography variant="body2" color={spec.smooth === true ? "success.main" : (spec.smooth === false ? "error.main" : "text.secondary")}>
                                        {String(spec.smooth)}
                                    </Mui.Typography>
                                </Mui.Box>
                                <Mui.Box>
                                    <Mui.Typography variant="caption" display="block" color="text.secondary">Power Efficient</Mui.Typography>
                                    <Mui.Typography variant="body2" color={spec.powerEfficient === true ? "success.main" : (spec.powerEfficient === false ? "text.secondary" : "text.secondary")}>
                                        {String(spec.powerEfficient)}
                                    </Mui.Typography>
                                </Mui.Box>
                            </Mui.Box>
                            
                            {!spec.smooth && spec.supported && (
                                <Mui.Typography variant="caption" color="warning.main" sx={{ mt: 1 }}>
                                    ⚠️ May cause frame drops on this device.
                                </Mui.Typography>
                            )}
                        </Mui.Paper>
                    </Mui.Grid>
                ))}
            </Mui.Grid>

            <Mui.Box sx={{ mt: 4, textAlign: 'center' }}>
                <Mui.Button variant="outlined" onClick={() => window.location.href = '/'}>
                    Back to App
                </Mui.Button>
            </Mui.Box>
        </Mui.Box>
    );
}
