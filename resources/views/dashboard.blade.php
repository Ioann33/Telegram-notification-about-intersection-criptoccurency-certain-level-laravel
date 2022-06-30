<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ __('Dashboard') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6 bg-white border-b border-gray-200">
                    <h2 id="eth" class="font-semibold text-xl text-gray-800 leading-tight"> </h2>
                    <h2 id="btc" class="font-semibold text-xl text-gray-800 leading-tight"> </h2>
                    <h2 id="bnb" class="font-semibold text-xl text-gray-800 leading-tight"> </h2>
                </div>
            </div>
        </div>
    </div>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6 bg-white border-b border-gray-200">
                    <form name="addAlert">
                        <h2 style="font-size: 1.4rem">Add alert</h2>
                        <label>Cripto
                            <select name="name" required>
                                <option>BTCUSDT</option>
                                <option>ETHUSDT</option>
                                <option>BNBUSDT</option>
                            </select>
                        </label>
                        <label>Prise
                            <input type="number" name="prise" required>
                        </label>
                        <label>Direction
                            <select name="dir" required>
                                <option>above</option>
                                <option>below</option>
                            </select>
                        </label>
                        <label>Description
                            <input type="text" name="message">
                        </label>
                        <input type="submit" value="Add" class="add-btn">
                    </form>
                    <div class="list">
                        <ul>

                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>

</x-app-layout>
<script src="{{ asset('js/watcher.js') }}"></script>
