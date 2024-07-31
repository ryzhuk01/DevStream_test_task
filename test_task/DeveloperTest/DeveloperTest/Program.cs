using Newtonsoft.Json;
using DeveloperTest.Models;
using DeveloperTest.Services;

var instanceService = new InstanceService();
var vehicles = instanceService.GetInstances<Vehicle>().ToList();

while (true)
{
    Console.WriteLine("Choose an option:");
    Console.WriteLine("1. Display all vehicle names sorted alphabetically");
    Console.WriteLine("2. Search for a vehicle by name");
    Console.WriteLine("3. Write all vehicle instances to disk");
    Console.WriteLine("4. ReverseString(string s)");
    Console.WriteLine("5. IsPalindrome(string s)");
    Console.WriteLine("6. MissingElements (int[] arr)");
    Console.WriteLine("7. Exit.");
    var choice = Console.ReadLine();

    switch (choice)
    {
        case "1":
            WriteVehicleNamesToConsole(vehicles);
            break;
        case "2":
            Console.WriteLine("Enter a part of the name:");
            var partialName = Console.ReadLine();
            var foundVehicles = SearchVehicleByName(vehicles, partialName);
            foreach (var vehicle in foundVehicles)
            {
                Console.WriteLine(vehicle.Type);
            }
            break;
        case "3":
            WriteInstancesToDisk(vehicles);
            Console.WriteLine("Saved to the disk");
            break;
        case "4":
            Console.WriteLine("Enter a string to reverse:");
            var str = Console.ReadLine();
            Console.WriteLine($"Reversed string: {ReverseString(str)}");
            break;
        case "5":
            Console.WriteLine("Enter a string to check for palindrome:");
            var palindromeStr = Console.ReadLine();
            Console.WriteLine($"Is palindrome: {IsPalindrome(palindromeStr)}");
            break;
        case "6":
            Console.WriteLine("Enter a sequence of numbers separated by commas:");
            var numberSequence = Console.ReadLine().Split(',').Select(int.Parse).ToArray();
            var missingElements = MissingElements(numberSequence);
            Console.WriteLine($"Missing elements: {string.Join(", ", missingElements)}");
            break;
        case "7":
            return;
        default:
            Console.WriteLine("Please choose from 1-7");
            break;
    }

    Console.WriteLine();
}

static void WriteVehicleNamesToConsole(IEnumerable<Vehicle> vehicles)
{
    var vehicleNames = vehicles.Select(v => v.Type).OrderBy(v => v);
    foreach (var name in vehicleNames)
    {
        Console.WriteLine(name);
    }
}

static IEnumerable<Vehicle> SearchVehicleByName(IEnumerable<Vehicle> vehicles, string partialName) =>
    vehicles.Where(v => v.Type.Contains(partialName, StringComparison.OrdinalIgnoreCase));

static void WriteInstancesToDisk(IEnumerable<Vehicle> vehicles)
{
    var json = JsonConvert.SerializeObject(vehicles, Formatting.Indented);
    File.WriteAllText("vehicles.json", json);
}

static string ReverseString(string s)
{
    // or
    // char[] charArray = s.ToCharArray(); 
    // Array.Reverse(charArray); 
    // technically not string.reverse

    var reversedString = new char[s.Length];
    for (int i = 0, j = s.Length - 1; i < s.Length; i++, j--)
    {
        reversedString[i] = s[j];
    }
    return new string(reversedString);
}

static bool IsPalindrome(string s) => s.ToLower() == ReverseString(s.ToLower());

static IEnumerable<int> MissingElements(int[] arr)
{
    var result = new List<int>();
    for (int i = 1; i < arr.Length; i++)
    {
        int diff = arr[i] - arr[i - 1];
        if (diff > 1)
        {
            for (int j = 1; j < diff; j++)
            {
                result.Add(arr[i - 1] + j);
            }
        }
    }
    return result;
}