using DeveloperTest.Models;
using System.Reflection;

namespace DeveloperTest.Services;
public class InstanceService
{
    public IEnumerable<T> GetInstances<T>() where T : Vehicle
    {
        var type = typeof(T);
        var types = Assembly.GetExecutingAssembly().GetTypes()
                            .Where(p => type.IsAssignableFrom(p) && !p.IsAbstract);

        foreach (var t in types)
        {
            yield return (T)Activator.CreateInstance(t);
        }
    }
}