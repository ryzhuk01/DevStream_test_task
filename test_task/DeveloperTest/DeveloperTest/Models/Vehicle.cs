namespace DeveloperTest.Models;
public abstract class Vehicle(string type, int maxSpeed, int numOfWheels)
{
    public string Type { get; } = type;
    public int MaxSpeed { get; } = maxSpeed;
    public int NumOfWheels { get; } = numOfWheels;
}
