<script>
    let currentSceneName;

    // Pano2VR events
    pano.on('configloaded', function () {
        pano.on('changenode', function () {
            currentSceneName = pano.getNodeUserdata(pano.getCurrentNode()).title;
        });
    });

</script>

{#if currentSceneName != "undefined"}
     <h3>{currentSceneName}</h3>
{/if}
    
<style lang="scss">
    h3 {
        position: absolute;
        top: 16px;
        left: 50%;
        transform: translateX(-50%);
        font-size: 14px;
        color: white;
        background-color: rgba(115, 103, 240, 1);
        padding: 4px 8px;
        border-radius: 6px;
        font-weight: 400;
        z-index: 11;
    }
</style>